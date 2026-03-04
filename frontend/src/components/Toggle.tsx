type ToggleProps = {
  label?: string;
  value: boolean;
  onChange: (checked: boolean) => void;
};

export default function Toggle({ label, value, onChange }: ToggleProps) {
  return (
    <label className="flex items-center justify-between">
      <span>{label}</span>

      <input
        type="checkbox"
        checked={!!value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.checked)
        }
      />
    </label>
  );
}
