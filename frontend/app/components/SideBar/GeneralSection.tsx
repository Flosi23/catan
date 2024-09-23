import { Label } from "@components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { Section } from "@components/SideBar/Section";

interface GeneralSectionProps {
  onSizeChange: (size: number) => void;
  size: number;
}

export const GeneralSection = ({ onSizeChange, size }: GeneralSectionProps) => {
  return (
    <Section title="General Settings">
      <div className="flex flex-col gap-2">
        <Label>Field Size</Label>
        <Select
          value={size.toString()}
          defaultValue={size.toString()}
          onValueChange={(v) => onSizeChange(Number(v))}>
          <SelectTrigger>
            <SelectValue placeholder="Choose size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Section>
  );
};
