import os
import torch
from datasets import load_dataset
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    BitsAndBytesConfig,
    TrainingArguments
)
from peft import LoraConfig, prepare_model_for_kbit_training, get_peft_model
from trl import SFTTrainer
from huggingface_hub import login

import argparse

# --- Configuration ---
model_id = "google/medgemma-4b-it"

def parse_args():
    parser = argparse.ArgumentParser(description="Fine-tune MedGemma on NMC nursing data.")
    parser.add_argument("--output_dir", type=str, default="./medgemma-nursing-v1", 
                        help="Directory to save benchmarks and model weights.")
    return parser.parse_args()

# Path handling for Colab/Local flexibility
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
dataset_path = os.path.join(SCRIPT_DIR, "..", "data", "nmc_dataset_web.jsonl")

# IMPORTANT: For persistent checkpoints in Colab, mount Google Drive:
# drive.mount('/content/drive')
# Then update this to: \"/content/drive/My Drive/nursing-proficiency-plus-checkpoints\"
output_dir = \"./nursing-proficiency-plus-v1\" 

# Hugging Face Settings
hub_model_id = \"NurseCitizenDeveloper/nursing-proficiency-plus\" 
push_to_hub = True
hub_private_repo = True # Set to True for gated/private access

def fine_tune(args, hf_token=None):
    if hf_token:
        login(token=hf_token)
    elif push_to_hub:
        print("Warning: push_to_hub is True but no HF token provided. Ensure you are logged in via huggingface-cli.")

    output_dir = args.output_dir
    dataset = load_dataset("json", data_files=dataset_path, split="train")

    # 2. BitsAndBytes Configuration (QLoRA)
    bnb_config = BitsAndBytesConfig(
        load_in_4bit=True,
        bnb_4bit_quant_type="nf4",
        bnb_4bit_compute_dtype=torch.bfloat16,
        bnb_4bit_use_double_quant=True
    )

    # 3. Load Model & Tokenizer
    model = AutoModelForCausalLM.from_pretrained(
        model_id,
        quantization_config=bnb_config,
        device_map="auto",
        trust_remote_code=True
    )
    model.config.use_cache = False
    model = prepare_model_for_kbit_training(model)

    tokenizer = AutoTokenizer.from_pretrained(model_id, trust_remote_code=True)
    tokenizer.pad_token = tokenizer.eos_token
    tokenizer.padding_side = "right"

    # 4. LoRA Configuration
    peft_config = LoraConfig(
        lora_alpha=16,
        lora_dropout=0.1,
        r=64,
        bias="none",
        task_type="CAUSAL_LM",
        target_modules=["q_proj", "k_proj", "v_proj", "o_proj", "gate_proj", "up_proj", "down_proj"]
    )
    model = get_peft_model(model, peft_config)

    # Robust SFTConfig setup
    sft_config = SFTConfig(output_dir=args.output_dir)
    sft_config.dataset_text_field = \"output\"
    sft_config.max_seq_length = 1024
    sft_config.num_train_epochs = 3
    sft_config.per_device_train_batch_size = 4
    sft_config.gradient_accumulation_steps = 4
    sft_config.optim = \"paged_adamw_32bit\"
    sft_config.save_strategy = \"steps\"
    sft_config.save_steps = 50
    sft_config.save_total_limit = 2
    sft_config.logging_steps = 10
    sft_config.learning_rate = 2e-4
    sft_config.weight_decay = 0.001
    sft_config.bf16 = True
    sft_config.push_to_hub = True
    sft_config.hub_model_id = hub_model_id
    sft_config.hub_private_repo = True
    sft_config.hub_strategy = \"checkpoint\"
    sft_config.report_to = \"none\"
    
    trainer = SFTTrainer(
        model=model, 
        train_dataset=dataset, 
        peft_config=peft_config, 
        processing_class=tokenizer, # Use 'processing_class' instead of 'tokenizer' for trl>=0.12.0
        args=sft_config, 
        packing=False
    )

    # 7. Start Training (Resume if checkpoint exists)
    checkpoint = None
    if os.path.isdir(output_dir) and any(d.startswith("checkpoint") for d in os.listdir(output_dir)):
        checkpoint = True
        print(f"Loading from checkpoint in {output_dir}")

    trainer.train(resume_from_checkpoint=checkpoint)

    # 8. Final Save
    trainer.model.save_pretrained(output_dir)
    tokenizer.save_pretrained(output_dir)
    
    if push_to_hub:
        trainer.push_to_hub()

if __name__ == "__main__":
    args = parse_args()
    # Get HF token from env if available
    token = os.getenv("HF_TOKEN")
    fine_tune(args, hf_token=token)
