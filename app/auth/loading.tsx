import { FormSkeleton } from "@/components/skeletons/forms";

const Loading = () => {
  return (
    <div className="flex justify-center my-8 mt-24">
      <FormSkeleton />
    </div>
  );
};

export default Loading;
