# AI News Monitoring System

## 🤖 Overview

This automated system scans major AI news sources weekly and creates a GitHub Issue with relevant updates for nursing education.

---

## 📅 Schedule

- **Runs**: Every Monday at 9:00 AM UTC
- **Manual Trigger**: Available via GitHub Actions tab

---

## 🔍 What It Does

1. **Scans These Sources**:
   - Google AI Blog
   - OpenAI Blog
   - DeepMind Blog
   - Healthcare AI News

2. **Filters for Keywords**:
   - nursing, healthcare, clinical, medical, patient
   - diagnosis, education, learning, gemini, multimodal

3. **Creates GitHub Issue** with:
   - Article title and source
   - Publication date
   - Summary snippet
   - Direct link to full article

---

## 📬 How to Get Notified

### Option 1: GitHub Notifications (Default)
1. Go to repository **Settings** → **Notifications**
2. Enable "Issues" notifications
3. You'll receive an email when new issues are created

### Option 2: Watch for Labels
- Each digest is tagged with `ai-news` and `content-update`
- Filter your GitHub notifications by these labels

---

## 🧪 Test It Manually

1. Go to **Actions** tab in GitHub
2. Select "AI News Scanner for Nursing Education"
3. Click **Run workflow** → **Run workflow**
4. Check the **Issues** tab after completion

---

## 🔧 Customization

### Add More RSS Feeds
Edit `.github/workflows/ai-news-scanner.yml`, line 31:
```python
FEEDS = {
    "Your Source Name": "https://example.com/rss",
}
```

### Adjust Keywords
Edit line 41:
```python
KEYWORDS = ["your", "custom", "keywords"]
```

### Change Schedule
Edit line 6:
```yaml
cron: '0 9 * * 1'  # Monday 9AM UTC
```

---

## 📈 Future Enhancements

- [ ] Email integration via SendGrid
- [ ] AI-powered content update suggestions (Gemini API)
- [ ] Automatic PR creation for minor updates
- [ ] Sentiment analysis on healthcare AI trends

---

## ❓ Troubleshooting

**No issues created?**
- Check if news sources contained relevant keywords
- Manually trigger workflow to test
- Review Actions logs for errors

**Too many notifications?**
- Adjust keyword filters to be more specific
- Change schedule frequency (e.g., bi-weekly)
