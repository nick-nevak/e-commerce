import Button from '@mui/material/Button';
import { RefObject, useEffect, useState } from 'react';
import { fetchCategories } from '../../../api/axios';
import { Category } from '../../../types/category';
import CategoriesMenu from './CategoriesMenu';

type Props = {
  anchorEl: RefObject<HTMLElement>
}
const CategoriesToggle = ({ anchorEl }: Props) => {
  const [isOpened, setIsOpened] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => { fetchCategories().then(setCategories); }, []);

  return (
    <>
      <Button
        children="Catalog"
        onClick={() => { setIsOpened((prev) => !prev); }}
      />
      {isOpened ? <CategoriesMenu categories={categories} anchorEl={anchorEl} /> : null}
    </>
  );
}

export default CategoriesToggle;