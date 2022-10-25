import { NextPage } from 'next';
import Link from 'next/link';
import { trpc } from '../utils/trpc';

const Add: NextPage = () => {
  const createCharacterMutation = trpc.createCharacter.useMutation();

  function onSubmitCreateCharacter(e: any) {
    e.preventDefault();
    if (e.target[0]) createCharacterMutation.mutate({ name: e.target[0].value });
    console.log(createCharacterMutation.data?.character);
  }

  return (
    <div className="flex h-screen w-screen flex-col">
      <main>
        <form onSubmit={onSubmitCreateCharacter}>
          <input name="text" type="text" className="text-black" />
          <button type="submit" className="rounded-md bg-emerald-400 p-2">
            Adicionar
          </button>
        </form>
      </main>
      <footer>
        <Link href="/">Home</Link>
      </footer>
    </div>
  );
};

export default Add;
