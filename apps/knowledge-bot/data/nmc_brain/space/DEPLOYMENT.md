# Deploying Nursing Proficiencies+ Coach to Hugging Face Spaces

Follow these steps to deploy your chatbot to Hugging Face Spaces.

## Prerequisites

- A Hugging Face account
- Access to your model: `NurseCitizenDeveloper/nursing-proficiency-plus`

## Deployment Steps

### Option 1: Web Interface (Recommended for Beginners)

1. **Go to Hugging Face Spaces**
   - Navigate to https://huggingface.co/spaces
   - Click **"Create new Space"**

2. **Configure Your Space**
   - **Space name**: `nursing-proficiencies-plus-coach`
   - **License**: Apache 2.0
   - **SDK**: Gradio
   - **Hardware**: CPU (Basic) or T4 GPU (Small) for faster responses
   - **Visibility**: Public or Private (your choice)

3. **Upload Files**
   - Click on "Files and versions" tab
   - Upload these files from the `space/` folder:
     - `app.py`
     - `requirements.txt`
     - `README.md`

4. **Wait for Build**
   - The Space will automatically build (5-10 minutes)
   - You'll see logs in the "App" tab
   - Once complete, your chatbot will be live!

### Option 2: Git/CLI Method

1. **Clone the Space Repository**
   ```bash
   git clone https://huggingface.co/spaces/[YOUR_USERNAME]/nursing-proficiencies-plus-coach
   cd nursing-proficiencies-plus-coach
   ```

2. **Copy Files**
   ```bash
   # From your nmc_brain/space/ folder
   cp app.py requirements.txt README.md [path-to-cloned-space]/
   ```

3. **Push to Hugging Face**
   ```bash
   git add .
   git commit -m "Initial deployment of Nursing Proficiencies+ Coach"
   git push
   ```

4. **Monitor Build**
   - Go to https://huggingface.co/spaces/[YOUR_USERNAME]/nursing-proficiencies-plus-coach
   - Watch the build logs

## Hardware Recommendations

- **CPU (Free tier)**: Works, but responses will be slower (30-60 seconds)
- **T4 GPU (Small)**: Faster responses (5-10 seconds) - Recommended
- **A10G GPU (Medium)**: Best performance (2-5 seconds) - For high traffic

## Post-Deployment

### Test Your Chatbot
1. Visit your Space URL
2. Start a conversation
3. Verify the welcome message appears
4. Ask a nursing proficiency question
5. Check response quality

### Share Your Space
- Copy the Space URL: `https://huggingface.co/spaces/[YOUR_USERNAME]/nursing-proficiencies-plus-coach`
- Share with students, colleagues, or on social media
- Embed in your website using the embed code provided by HF

### Monitor Usage
- View analytics in your Space settings
- Check logs for errors
- Gather user feedback

## Troubleshooting

### Build Fails
- Check `requirements.txt` for typos
- Ensure all dependencies are compatible
- Review build logs for specific errors

### Model Not Loading
- Verify you have access to `NurseCitizenDeveloper/nursing-proficiency-plus`
- Check if the model is private (requires HF token)
- Increase timeout in Space settings

### Slow Responses
- Upgrade to GPU hardware
- Reduce `max_new_tokens` in app.py
- Enable caching

### Out of Memory
- Use smaller batch sizes
- Enable gradient checkpointing
- Upgrade hardware tier

## Updating Your Space

To update the chatbot:
1. Edit the files locally
2. Upload to Space (web interface) or push via Git
3. Space will automatically rebuild

## Support

For issues or questions:
- Check Hugging Face Spaces documentation
- Visit the Nursing Citizen Development community
- Contact: Lincoln Gombedza

---

**Good luck with your deployment!** 🚀
