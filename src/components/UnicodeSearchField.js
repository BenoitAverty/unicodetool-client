const UnicodeSearchField = ({ value, onChange }) => (
  <div className="UnicodeSearchField">
    <input
      type="text"
      placeholder="Search for anything..."
      value={value}
      onChange={e => onChange(e.target.value)}
    />
    <style jsx>
      {`
        .UnicodeSearchField {
          margin: auto;
          text-align: center;
        }

        input {
          width: 65%;
          padding: 0.5rem 1.5rem;
          border-radius: 0.5rem;
          border: 0.5px solid #0275d8;
          margin-bottom: 1rem;
        }
      `}
    </style>
  </div>
)

export default UnicodeSearchField
