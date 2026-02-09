import { useEffect, useState } from 'react';

import type { TOrder } from '@/utils/types';

type TOrderResult = {
  data: TOrder;
};

export function useOrderData(): TOrderResult {
  const [data, setData] = useState<TOrder>({ id: '', status: '' });

  useEffect(() => {
    setData({ id: '034536', status: 'pending' });
  }, []);

  return { data };
}
