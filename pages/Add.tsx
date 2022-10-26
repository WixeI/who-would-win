import { inferProcedureInput } from '@trpc/server';
import { NextPage } from 'next';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { AppRouter } from '../server/routers/_app';
import { trpc } from '../utils/trpc';

type FormData = inferProcedureInput<AppRouter['createCharacter']>;

const Add: NextPage = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const createCharacterMutation = trpc.createCharacter.useMutation();

  const handleCreateCharacter = handleSubmit((data) => {
    createCharacterMutation.mutate({ name: data.name });
    reset({ name: '' });
  });

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-between p-6">
      <main className="flex flex-col gap-12">
        <h1 className="text-center font-blackOpsOne text-4xl sm:text-5xl md:text-6xl">
          Add Fighter
        </h1>

        <form className="flex flex-col gap-5" onSubmit={handleCreateCharacter}>
          <label className="flex flex-col gap-1">
            <span>Name:</span>
            <input type="text" {...register('name')} className="rounded-sm p-1 text-black" />
          </label>

          <label className="flex flex-col gap-1">
            <span>Image *optional:</span>
            <input name="text" type="text" className="rounded-sm p-1 text-black" />
          </label>

          <button type="submit" className="mt-2 rounded-md bg-emerald-500 p-2">
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
