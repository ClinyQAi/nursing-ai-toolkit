import gradio as gr
import time

# Mock functions to replace model calls
def generate_response(message, history):
    time.sleep(0.1)
    return "This is a mock response."

# Create Gradio interface with custom theme
with gr.Blocks(
    theme=gr.themes.Soft(
        primary_hue="blue",
        secondary_hue="cyan",
    ),
    title="Nursing Proficiencies+ Coach"
) as demo:
    
    gr.Markdown(
        """
        # 🩺 Nursing Proficiencies+ Coach
        """
    )
    
    chatbot = gr.Chatbot(
        value=[],
        height=600,
        avatar_images=(None, "🩺"),
        show_label=False
    )
    
    with gr.Row():
        msg = gr.Textbox(
            placeholder="Ask a question...",
            show_label=False,
            scale=9
        )
        send = gr.Button("Send 📤", scale=1, variant="primary")
    
    with gr.Row():
        clear = gr.Button("🔄 Clear Chat")
    
    # Event handlers
    msg.submit(generate_response, [msg, chatbot], [chatbot], queue=True).then(
        lambda: "", None, [msg]
    )
    send.click(generate_response, [msg, chatbot], [chatbot], queue=True).then(
        lambda: "", None, [msg]
    )
    clear.click(lambda: [], None, chatbot, queue=False)

# Launch the app
if __name__ == "__main__":
    demo.queue()
    # Mimic the launch parameters from the main app
    demo.launch(share=False, show_api=False)
