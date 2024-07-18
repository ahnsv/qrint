import { Button } from '@/components/ui/button'
import FileUploadDropzone from '@/components/ui/file-uploader';

export default function Home() {
  return (
    <div className='w-screen h-screen flex items-center justify-center flex-col'>
      <form className='w-3/4'>
        <FileUploadDropzone />
        <Button className='w-48 my-8'>Upload</Button>
      </form>
    </div>
  );
}
