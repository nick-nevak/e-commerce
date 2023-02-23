export type Filter = {
  id: string;
  name: string;
  values: FilterValue[];
};

export type FilterValue = {
  id: string;
  name: string;
  checked: boolean;
};
