import React from 'react';
import Feature from '_components/organisms/Feature';

const whatIsGPT3 =
  'GPT-3 is the third-generation natural lanague model of the GPT-n series by OpenAI. This iteration has a capacity of 175 billion machine learning parameters and produces stunning human-like text.\n\nSentenceSmith offers an intuitive user interface to interact with the powerful AI and help you create compelling, original content for your website, project, or paper.';

const featuresData = [
  {
    title: 'Generate creative marketing content',
    text: 'Explore new ideas for marketing campaigns and iterate through the best content, copy, and design rapidly with the help of SentenceSmith.',
  },
  {
    title: 'Have a conversation',
    text: "Tell SentenceSmith what's on your mind and generate great insight into what you're thinking.",
  },
  {
    title: 'Brain storm concepts',
    text: 'Our interface can help generate ideas by providing structure for your brainstorming session.',
  },
  {
    title: 'Translate code instanly',
    text: 'SentenceSmith is a multilingual tool, this includes the ability to create code from natural language.',
  },
];

const Features = () => (
  <div className="gpt3__features section__padding" id="features">
    <div className="gpt3__features-heading">
      <h1 className="gradient__text">The limits are your imagination</h1>
      <p>Built on OpenAI&apos;s GPT-3 API</p>
      <dfn>{whatIsGPT3}</dfn>
      <p>Request Early Access to Get Started</p>
    </div>
    <div className="gpt3__features-container">
      {featuresData.map((item, index) => (
        <Feature title={item.title} text={item.text} key={item.title + index} />
      ))}
    </div>
  </div>
);

export default Features;
