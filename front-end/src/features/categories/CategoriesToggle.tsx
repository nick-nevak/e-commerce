import Button from '@mui/material/Button';
import { RefObject, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCategories } from '../../api/axios';
import { Category } from '../../types/category';
import CategoriesMenu from './CategoriesMenu';
// import { flow } from 'lodash'
import { flow } from 'lodash';

type Props = {
  anchorEl: RefObject<HTMLElement>
}
const CategoriesToggle = ({ anchorEl }: Props) => {
  const [isOpened, setIsOpened] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => { fetchCategories().then(setCategories) }, []);

  const closeMenu = () => { setIsOpened((prev) => !prev); }

  const selectCategory = flow(
    (id: string) => navigate(`/catalog?category=${id}`),
    closeMenu
  );

  return (
    <>
      <Button
        children="Catalog"
        onClick={closeMenu}
      />
      {isOpened ? <CategoriesMenu categories={categories} onSelect={selectCategory} anchorEl={anchorEl} /> : null}
    </>
  );
}

export default CategoriesToggle;