export type Filter = {
  name: string;
  values: FilterValue[];
};

export type FilterValue = {
  name: string;
  checked: boolean;
};
