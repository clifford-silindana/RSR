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
import CheckboxOne from "./Checkboxes/CheckboxOne";

interface PeoplePickerProps {
  people: any;
  person: any;
  id: any;
  handleCloseModal?: () => void;
}

const PeoplePicker: React.FC<PeoplePickerProps> = ({
  handleCloseModal,
  people,
  id,
  person,
}) => {
  const [open, setOpen] = useState(false);
  const { session } = useSession();
  const [selectedPerson, setSelectedPerson] = useState({});
  const isSaveButtonDisabled = Object.keys(selectedPerson).length === 0;

  const dialogClose = async () => {
    setOpen(false);
    handleCloseModal(selectedPerson, id);
  };

  const userFullNames = session?.user?.fullNames
    ? session?.user?.fullNames
    : session?.user?.userName;
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            type="button"
            className="flex items-center bg-logoorange text-white py-2 px-4 rounded hover:bg-bodydark2"
          >
            {!person ? (
              <span className="mr-2 text-sm">Assign </span>
            ) : (
              <span className="mr-2 text-sm">Re-assign </span>
            )}
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Select Permit Officer</DialogTitle>
            <DialogDescription>
              {/* <ul className="mb-6 flex flex-col gap-1.5"> */}
              {people.map((individual) => {
                return (
                  <div
                    className="grid grid-cols-4 gap-5 py-2 text-sm items-center p-10"
                    key={individual.azureUserId}
                  >
                    <div className="col-span-3">
                      <div className="font-medium text-black dark:text-white">{`${individual.firstName} ${individual.lastName}`}</div>
                    </div>
                    <div className="flex justify-center">
                      <input
                        type="radio"
                        id={individual.lastName}
                        name="personPicker"
                        disabled={person === individual.azureUserId}
                        value={`${individual.firstName} ${individual.lastName}`}
                        onChange={() => {
                            console.log("Selected Person:", individual);
                            setSelectedPerson(individual);
                          }}
                        className="h-5 w-5"
                      />
                    </div>
                  </div>
                );
              })}

              {/* </ul> */}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {!isSaveButtonDisabled && (
              <button
                className="h-11 px-6 rounded-md bg-black text-white hover:bg-logoorange"
                disabled={isSaveButtonDisabled}
                onClick={dialogClose}
              >
                Save
              </button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PeoplePicker;
