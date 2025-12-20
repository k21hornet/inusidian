import { useState, useCallback } from "react"

export interface FieldItem {
  fieldName: string
  fieldType: string
}

export function useFieldArray(initialFields: FieldItem[] = []) {
  const [fields, setFields] = useState<FieldItem[]>(initialFields)

  const updateField = useCallback((index: number, value: string) => {
    setFields((prev) => {
      const newFields = [...prev]
      newFields[index] = { ...newFields[index], fieldName: value }
      return newFields
    })
  }, [])

  const addField = useCallback(() => {
    setFields((prev) => [
      ...prev,
      { fieldName: "", fieldType: prev[0]?.fieldType || "front" },
    ])
  }, [])

  const removeField = useCallback((index: number) => {
    setFields((prev) => {
      const newFields = [...prev]
      newFields.splice(index, 1)
      return newFields
    })
  }, [])

  const resetFields = useCallback((newFields: FieldItem[]) => {
    setFields(newFields)
  }, [])

  return {
    fields,
    updateField,
    addField,
    removeField,
    resetFields,
  }
}

