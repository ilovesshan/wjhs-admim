interface IInput {
  label: string,
  placeholder: string,
  value: any,
}

interface ISelectedValue {
  id: string,
  name: string,
}

interface ISelected {
  label: string,
  values: Array<ISelectedValue>
}

export interface ICommonHeader {
  input: Array<IInput>,
  selected: Array<ISelected>,
  selectedIds: Array<string>,
}