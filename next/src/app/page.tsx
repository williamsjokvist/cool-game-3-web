import OnlineCharacterList from '@/components/home/online-character-list';
import { type FunctionComponent } from 'react';

export const revalidate = 60;

const Home: FunctionComponent = () => {
  return (
    <main>
      <OnlineCharacterList />
    </main>
  );
};

export default Home;
