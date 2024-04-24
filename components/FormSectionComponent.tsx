import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useSession from "@/hooks/useSession";

interface FormSectionProps {
  commentKey: String;
  register: any; // Replace with the correct type for register
  comments: string[];
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  handleCloseModal: () => void;
  application: any;
  isAdministrator: any;
}

const FormSectionComponent: React.FC<FormSectionProps> = ({
  commentKey,
  register,
  comments,
  comment,
  setComment,
  handleCloseModal,
  application,
  isAdministrator
}) => {
  const [open, setOpen] = useState(false);
  const { session } = useSession();
  const dialogClose = async () => {
    debugger;
    setOpen(false);
    handleCloseModal();
  }

  const userFullNames = session?.user?.fullNames ? session?.user?.fullNames : session?.user?.userName;
  return (
    <>
      <div className="px-2 py-2">
        <div className="grid grid-cols-4 gap-4 text-sm items-center">
          {/* Motivation and Action Section */}
          <div className="col-span-3">
            <div className="flex gap-2 ml-5 columns-3">
              <input
                disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                type="radio"
                id={...register(`motivationSafeConversion_${commentKey}`)}
              value="yes"
              className="h-5 w-5"
              {...register(`motivationSafeConversion_${commentKey}`)}
              /> Yes
              <input
                disabled={isAdministrator?.isAdministrator || application?.step10?.statusId === 39}
                type="radio"
                id={...register(`motivationSafeConversion_${commentKey}`)}
              value="no"
              className="h-5 w-5"
              {...register(`motivationSafeConversion_${commentKey}`)}
              >
            </input> No
          </div>
        </div>
        <div>
          {isAdministrator?.isAdministrator &&
            <>
              <label htmlFor={`networkOperationItems.lengthInKm`}>Assessment</label>
              <select
                id={...register(`rsrAction_${commentKey}`)}
              {...register(`rsrAction_${commentKey}`)}
              placeholder="Traction Type"
              className="h-10 px-4 border rounded-md w-full"
                >
              <option defaultValue="Compliant" >
                Compliant
              </option>
              <option defaultValue="Non-compliant">Non-compliant</option>
              <option defaultValue="Special condition">Special condition</option>
            </select>
        </>
          }
        {!isAdministrator?.isAdministrator && (application?.step10?.statusId === 37 || application?.step10?.statusId === 41) &&
          <>
            <label htmlFor={`networkOperationItems.lengthInKm`}>Assessment Outcome</label>
            <select
              disabled={!isAdministrator?.isAdministrator}
              id={...register(`rsrAction_${commentKey}`)}
            {...register(`rsrAction_${commentKey}`)}
            placeholder="Traction Type"
            className="h-10 px-4 border rounded-md w-full"
                >
            <option defaultValue="Compliant" >
              Compliant
            </option>
            <option defaultValue="Non-compliant">Non-compliant</option>
            <option defaultValue="Special condition">Special condition</option>
          </select>
        {/* <label >{register(`rsrAction_${commentKey}`)}</label>            */}
      </>
        }
    </div >
    </div >
    </div >

  <div className="w-full">
    {/* Comments Section */}
    {comments?.length > 0 &&
      comments.map((comment) => (
        <div
          commentKey={comment?.comment}
          className="ml-10 max-w-[70%] bg-whiten rounded-md p-3 mb-2 relative">
          <p className="text-base">{comment?.comment}</p>
          <div className="flex items-center justify-between mt-2">
            <div className="text-xs text-slate-400">{comment?.Author}</div>
            <div className="text-xs text-slate-400">{comment?.Created}</div>
          </div>
        </div>
      ))}
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        <button
          type="button"
          className="ml-10 flex items-center bg-bodydark text-black py-2 px-4 rounded hover:bg-bodydark2">
          <span className="mr-2 text-sm">Add comment</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add comment</DialogTitle>
          <DialogDescription>
            <textarea
              id={`comment_${commentKey}`}
              className="px-4 py-1 border rounded-md w-full"
              rows={6}
              value={comment?.comment}
              onChange={(event) => {
                const newComment = { comment: event.target.value, Author: userFullNames, Created: new Date().toISOString() }
                setComment(newComment)
              }
              }></textarea>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button
            className="h-11 px-6 rounded-md bg-black text-white hover:bg-logoorange"
            onClick={dialogClose}>
            Save
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
    </>
  );
};

export default FormSectionComponent;