import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

type QueryParams = Record<string, string>;
type UpdateQueryParamsFn = (paramName: string, value: string) => void;

const useQueryParams = (paramNames: string[]): [QueryParams, UpdateQueryParamsFn] => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState<QueryParams>({});

  console.log({ paramNames, location, searchParams, params });

  useEffect(() => {
    const updatedParams: QueryParams = {};

    paramNames.forEach((paramName) => {
      updatedParams[paramName] = searchParams.get(paramName) || '';
    });

    setParams(updatedParams);
  }, [location.search,]);
  // TODO Fix loop paramNames

  const updateQueryParam = (paramName: string, value: string) => {
    const updatedParams = new URLSearchParams(location.search);
    updatedParams.set(paramName, value);
    navigate(`?${updatedParams.toString()}`);
  };

  return [params, updateQueryParam];
};

export default useQueryParams;
