# Google Colab Training Instructions: Nursing Proficiency+

Follow these steps to retrain your model with the new 1000+ example dataset using Google Colab. These steps include setting up **persistent checkpointing** to Google Drive so you don't lose progress if the runtime disconnects.

## Step 1: Initialize Environment

Run this cell first to check your GPU and resources.
```python
!nvidia-smi
```

## Step 2: Mount Google Drive (Critical for Saving Progress)

This enables us to save model checkpoints directly to your Drive.
```python
from google.colab import drive
drive.mount('/content/drive')

# Create a directory for persistent checkpoints
import os
checkpoint_dir = "/content/drive/My Drive/nursing-proficiency-plus-checkpoints"
os.makedirs(checkpoint_dir, exist_ok=True)
print(f"Checkpoints will be saved to: {checkpoint_dir}")
```

## Step 3: Install Dependencies

Install the required libraries to handle the training script.
```python
!pip install -q -U torch bitsandbytes git+https://github.com/huggingface/transformers.git git+https://github.com/huggingface/peft.git git+https://github.com/huggingface/trl.git accelerate datasets huggingface_hub
```

## Step 4: Setup Configuration

1.  **Upload Files**: Ensure you have uploaded the following to the `Files` tab (left sidebar) in Colab:
    *   `fine_tune_medgemma.py` (The training script)
    *   `data/` folder containing `nmc_dataset_web.jsonl`
    
    *Structure should look like:*
    ```
    /content/
      fine_tune_medgemma.py
      data/
        nmc_dataset_web.jsonl
    ```

2.  **Login to Hugging Face**:
    You need to be logged in to push the model and access the base Gemma model.
    ```python
    from huggingface_hub import login
    # Replace with your actual token
    login(token="hf_YOUR_TOKEN_HERE")
    ```

## Step 5: Run Training (With Auto-Resume)

Run the script pointing to the Google Drive directory. The script is designed to automatically detect if checkpoints exist in that folder and resume from where it left off!

```python
# Run the training script
# We set --output_dir to the Google Drive path we created in Step 2.
!python fine_tune_medgemma.py --output_dir "/content/drive/My Drive/nursing-proficiency-plus-checkpoints"
```

## How to Resume if Disconnected?
If your Colab session times out or disconnects:
1.  **Reconnect** and run **Steps 2 & 3** (Mount Drive & Install Requirements).
2.  **Re-upload** the `fine_tune_medgemma.py` script and dataset if they are missing (Colab wipes local files, but your Drive is safe).
3.  **Run Step 5 again**. The script will see the existing checkpoints in your Drive and print: `Loading from checkpoint in /content/drive/My Drive/...` and continue training exactly where it stopped.

## Step 6: Verify & Test
Once training is complete, the final adapter will be in your Drive folder. You can load it to test:

```python
from peft import PeftModel
from transformers import AutoModelForCausalLM, AutoTokenizer

# Load Base Model
base_model = AutoModelForCausalLM.from_pretrained("google/medgemma-4b-it")
tokenizer = AutoTokenizer.from_pretrained("google/medgemma-4b-it")

# Load Your Fine-Tuned Adapter from Drive
adapter_path = "/content/drive/My Drive/nursing-proficiency-plus-checkpoints"
model = PeftModel.from_pretrained(base_model, adapter_path)

# Test
inputs = tokenizer("How can a student nurse demonstrate proficiency in aseptic technique?", return_tensors="pt")
outputs = model.generate(**inputs, max_new_tokens=200)
print(tokenizer.decode(outputs[0]))
```
