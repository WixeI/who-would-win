// import { inferProcedureInput } from '@trpc/server';
// import { AppRouter } from '../server/routers/_app';
import { NextPage } from 'next';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { trpc } from '../utils/trpc';
import { useState, ChangeEvent } from 'react';

// type FormData = inferProcedureInput<AppRouter['createCharacter']>;
type FormData = {
  name: string;
  imageFileList: FileList;
};

const Add: NextPage = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [previewImageSource, setPreviewImageSource] = useState(
    'https://quantocustaviajar.com/blog/wp-content/uploads/2022/03/cat-scaled.jpg'
  );
  //Image Management
  const handleImagePreview = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const file = event.target.files[0];
    const imageURL = URL.createObjectURL(file);
    setPreviewImageSource(imageURL);
  };

  //Form Management
  const createCharacterMutation = trpc.createCharacter.useMutation();

  const handleCreateCharacter = handleSubmit(async (data) => {
    //Upload Image to Cloudinary
    if (!data.imageFileList) {
      notifyError('Please upload an image for your character');
      return;
    }

    const formData = new FormData();
    const file = data.imageFileList.item(0);

    if (!file) {
      notifyError('Could not read image');
      return;
    }

    formData.append('file', file);
    formData.append('upload_preset', 'who-would-win-character-uploads');

    const cloudinaryData = await fetch('https://api.cloudinary.com/v1_1/ddwn0fktt/image/upload', {
      method: 'POST',
      body: formData
    }).then((result) => result.json());

    console.log('data', cloudinaryData);

    //Character Creation in Database
    if (cloudinaryData.secure_url) {
      createCharacterMutation.mutate({ name: data.name, imageSource: cloudinaryData.secure_url });
      notifyAddedCharacter(data.name);
    } else notifyError('Could not create character because of image');

    reset({ name: '' });

    setPreviewImageSource('');
  });

  //Toast Management
  const notifyAddedCharacter = (name: string) =>
    toast.success(`Successfully added ${name}`, { position: 'bottom-center', theme: 'colored' });
  const notifyError = (errorMessage: string) =>
    toast.error(errorMessage, { position: 'bottom-center', theme: 'colored' });

  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center justify-between p-6">
        <main className="flex flex-col items-center gap-12 ">
          <h1 className="text-center font-blackOpsOne text-4xl sm:text-5xl md:text-6xl">
            Add Fighter
          </h1>

          <form className="flex w-[50%] flex-col gap-5" onSubmit={handleCreateCharacter}>
            <label className="flex flex-col gap-1">
              <span>Name:</span>
              <input type="text" {...register('name')} className="rounded-sm p-1 text-black" />
            </label>

            <label className="flex flex-col gap-1">
              <span>Image:</span>
              <input
                type="file"
                {...register('imageFileList', { onChange: handleImagePreview })}
                className="rounded-sm p-1 text-black"
              />

              {previewImageSource && (
                <img src={previewImageSource} alt="preview-image" className="w-[50%]" />
              )}
            </label>

            <button type="submit" className="mt-2 rounded-md bg-emerald-500 p-2">
              Add Fighter
            </button>
          </form>
        </main>
        <footer>
          <Link href="/">Home</Link>
        </footer>
      </div>
      <ToastContainer />
    </>
  );
};

export default Add;
