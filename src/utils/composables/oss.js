import useAli from './ali';

export default function useOss() {
  const oss = useAli();
  return { ...oss };
}
