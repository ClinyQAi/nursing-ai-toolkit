---
sidebar_position: 2
title: Creating Visual Content
description: Using Gen AI to create images, diagrams, and videos for nursing education
---

<div style={{textAlign: 'center', marginBottom: '20px'}}>
  <img src={require('@site/static/img/header_abstract_flow.png').default} alt="Visual Content Flow" style={{width: '50%', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}} />
</div>

# 🎨 Creating Visual Content with GenAI

:::info Attribution
**Original work**: "Educators' guide to multimodal learning and Generative AI" — Tünde Varga-Atkins, Samuel Saunders, et al. (2024/25) — [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)  
**Adapted for UK Nursing Education by**: Lincoln Gombedza, RN (LD)  
**Last Updated**: December 2025
:::

Educators can use Generative AI to create rich visual content that enhances nursing education across multiple contexts—from academic posters and presentations to interactive learning materials and clinical demonstrations.

## 🖌️ What You Can Create

<div className="row">
  <div className="col col--6 margin-bottom--md">
    <div className="card h-100">
      <div className="card__header">
        <h3>1. Teaching Materials</h3>
      </div>
      <div className="card__body">
        <ul>
          <li>📊 <strong>Diagrams</strong>: Care pathways & flowcharts.</li>
          <li>🖼️ <strong>Icons</strong>: Consistency for slide decks.</li>
          <li>🎨 <strong>Metaphors</strong>: Visualizing "Holistic Care".</li>
        </ul>
      </div>
    </div>
  </div>
  <div className="col col--6 margin-bottom--md">
    <div className="card h-100">
      <div className="card__header">
        <h3>2. Infographics</h3>
      </div>
      <div className="card__body">
        <ul>
          <li>📝 <strong>Text Rendering</strong>: Modern models (DALL-E 3) can spell text correctly.</li>
          <li>🏥 <strong>Posters</strong>: Sepsis Six protocols or hand hygiene steps.</li>
        </ul>
      </div>
    </div>
  </div>
  <div className="col col--6 margin-bottom--md">
    <div className="card h-100">
      <div className="card__header">
        <h3>3. Localization</h3>
      </div>
      <div className="card__body">
        <ul>
          <li>🌍 <strong>Translation</strong>: Translate text *within* an image (e.g., a FAST stroke poster into Spanish) while keeping the layout.</li>
        </ul>
      </div>
    </div>
  </div>
  <div className="col col--6 margin-bottom--md">
    <div className="card h-100">
      <div className="card__header">
        <h3>4. Explainers</h3>
      </div>
      <div className="card__body">
        <ul>
          <li>🎥 <strong>Video</strong>: Turn a script into an animated explainer.</li>
          <li>🗣️ <strong>Narration</strong>: Add AI voiceovers to slides.</li>
        </ul>
      </div>
    </div>
  </div>
</div>

---

## 💡 Prompt Library: Nursing Examples

Copy these prompts to start creating immediately.

### 🫀 Anatomy Diagrams (Year 1)
:::tip Prompt
"Create a detailed cross-sectional diagram of the **human heart** showing the four chambers, major blood vessels, and direction of blood flow. Use **medical illustration style** with clear labels. Suitable for Year 1 nursing students."
:::

<div style={{textAlign: 'center', marginTop: '1rem', marginBottom: '1.5rem'}}>
  <img src={require('@site/static/img/cardiac-anatomy-explorer.png').default} alt="Cardiac Anatomy Explorer Example" style={{borderRadius: '8px', border: '1px solid #ddd', maxWidth: '100%', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}} />
  <p style={{marginTop: '0.5rem'}}>
    <a href="https://gemini.google.com/share/112e337f8b3f" target="_blank" rel="noopener noreferrer"><strong>🚀 Open in Gemini to Remix this Example</strong></a>
  </p>
</div>

### 🦠 Infection Control Flowchart
:::tip Prompt
"Create a visual flowchart showing the **chain of infection**: infectious agent, reservoir, portal of exit, means of transmission, portal of entry, and susceptible host. Include examples at each stage. Use **NHS color scheme** (Blue/White)."
:::

### 💊 Medication Icons
:::tip Prompt
"Create a set of simple, clear icons representing the **5 Rights of medication administration** (Right patient, Right drug, Right dose, Right route, Right time). Minimalist style, suitable for infographic use."
:::

### 🤝 Person-Centred Care Metaphor
:::tip Prompt
"Create a visual metaphor representing **person-centred care** in nursing. Show a patient at the center surrounded by healthcare professionals, family, and various aspects of holistic care. **Watercolor illustration style**, warm and compassionate tone."
:::

---

## 🛠️ Tool Selection Matrix

Which tool is best for your specific visual need?

| Capability | 🏆 Best Tool | Why? |
| :--- | :--- | :--- |
| **Photorealistic Images** | **Midjourney v6** | Highest artistic quality and realism. |
| **Diagrams with Text** | **DALL-E 3 (ChatGPT)** | Excellent at spelling words correctly within images. |
| **Logic Flowcharts** | **Mermaid (via ChatGPT)** | Generates editable code for diagrams, not just pixels. |
| **Video Explainers** | **Synthesia / HeyGen** | Create AI avatars to narrate your scripts. |
| **Slide Decks** | **Gamma** | Generates full PowerPoint decks with layout and images. |

---

## ✅ Best Practices Checklist

### DO:
*   ✅ **Verify Anatomy**: AI often gets number of fingers or heart chambers wrong. Check against a textbook.
*   ✅ **Check Text**: Ensure any text inside the image is spelled correctly (AI struggles with this).
*   ✅ **Disclose**: Label images as "AI Generated" for transparency.

### DON'T:
*   ❌ **No Patient Data**: Never upload real patient photos to edit.
*   ❌ **Avoid Stereotypes**: Ask for "diverse healthcare team" to avoid all-female nurse depictions.

---

## 📝 Activity: Create Your First Visual

1.  **Choose**: A concept (e.g., "The Nursing Process").
2.  **Prompt**: Describe it ("Circular flow, 4 stages, professional style").
3.  **Generate**: Use DALL-E 3 or Bing Image Creator.
4.  **Critique**: Is the text legible? Is the anatomy correct?
5.  **Refine**: "Regenerate, but make the text larger."

**Next**: Explore [Teaching Delivery](./teaching-delivery) to learn how to integrate these visuals into lectures!
