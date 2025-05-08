"use client";

function SystemSettingCard({ value, name }) {
  const [buttonName, setButtonName] = useState(() =>
    value ? "change" : "Add"
  );

  return (
    <form>
      <label>{name}</label>
      <input type="text" defaultValue={value} />
      <button>{buttonName}</button>
    </form>
  );
}

export default SystemSettingCard;
