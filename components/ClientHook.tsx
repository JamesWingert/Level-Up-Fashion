import { useEffect, useState } from 'react';

export default function useHasMounted() {
  // Helps with client side rrendering
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
}
