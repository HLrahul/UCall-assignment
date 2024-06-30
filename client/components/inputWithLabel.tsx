import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type InputWithLabelProps = {
  label: string;
  value: string;
  setValue: (value: string) => void;
};

export function InputWithLabel({
  label,
  value,
  setValue,
}: InputWithLabelProps) {
  return (
    <div className="grid w-full items-center gap-2">
      <Label htmlFor={label}>{label}</Label>
      <Input
        type="text"
        id={label}
        placeholder={label}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
