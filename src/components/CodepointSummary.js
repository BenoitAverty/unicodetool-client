const CodepointSummary = ({ codepoint }) => (
  <div className='CodepointSummary'>
    <p className='displayedCharacter'><strong>{codepoint.character}</strong></p>
    <div className='characterProperties'>
      <h1>{codepoint.value} {codepoint.name}</h1>
      <ul>
        <li>Block: {codepoint.properties.block}</li>
        <li>General Category: {codepoint.properties.generalCategory}</li>
      </ul>
    </div>
    <style jsx>{`
      .CodepointSummary {
        display: flex;
        align-items: center;
        background: #0275d8;
        border-radius: 0.5rem;
        color: white;
        padding: 0.5rem;
      }
      .displayedCharacter {
        flex: 0 1 auto;
        width: 80px;
        height: 80px;
        margin: 0;
        color: black;
        font-size: 60px;
        background: #eceeef;
        border-radius: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .characterProperties {
        padding-left: 1rem;
      }
      .characterProperties h1 {
        font-size: 1.1rem;
        font-weight: bold;
      }
      .characterProperties ul {
        list-style-type: none;
        font-size: 0.9rem;
        padding-left: 15px;
        margin: 0;
      }
    `}</style>
  </div>
)
export default CodepointSummary
