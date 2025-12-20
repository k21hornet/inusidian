import { FormInput } from "@/components/ui/form-input";
import { Plus, X } from "lucide-react";

interface FieldArraySectionProps {
  fields: Array<{ fieldName: string; fieldType: string }>;
  labelPrefix: string;
  placeholder: string;
  onFieldChange: (index: number, value: string) => void;
  onAddField: () => void;
  onRemoveField: (index: number) => void;
}

export function FieldArraySection({
  fields,
  labelPrefix,
  placeholder,
  onFieldChange,
  onAddField,
  onRemoveField,
}: FieldArraySectionProps) {
  return (
    <div className="flex-1">
      {fields.map((field, index) => (
        <div key={index} className="flex items-end gap-2 mb-2">
          <FormInput
            label={`${labelPrefix}${index + 1}*`}
            type="text"
            name={`${labelPrefix.toLowerCase()}_${index}`}
            value={field.fieldName}
            onChange={(e) => onFieldChange(index, e.target.value)}
            required
            placeholder={placeholder}
            className="w-[225px]"
          />
          {index === 0 ? (
            <button
              type="button"
              onClick={onAddField}
              className="mb-2 p-2 text-[#9E9E9E] hover:text-foreground cursor-pointer transition-colors"
              aria-label="フィールドを追加"
            >
              <Plus className="w-6 h-6" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onRemoveField(index)}
              className="mb-2 p-2 text-[#9E9E9E] hover:text-foreground cursor-pointer transition-colors"
              aria-label="フィールドを削除"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

