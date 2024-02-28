import React, { ReactNode } from "react";
import { VoteData } from "./typeCalculator";

interface VoteFormProps {
  handleSubmit: React.FormEventHandler;
  voteData: VoteData;
  setVoteData: React.Dispatch<React.SetStateAction<VoteData>>;
}

interface BinaryChoiceButtonProps {
  name: keyof VoteData;
  value: string;
  currentValue: string;
  title: string;
  onBinaryChoiceClick: (name: keyof VoteData, value: string) => void;
}

interface BinaryChoiceSectionProps {
  label: string;
  name: keyof VoteData;
  leftButtonValue: string;
  leftButtonTitle: string;
  rightButtonValue: string;
  rightButtonTitle: string;
  currentValue: string;
  onBinaryChoiceClick: (name: keyof VoteData, value: string) => void;
}

const BinaryChoiceSection: React.FC<BinaryChoiceSectionProps> = ({
  label,
  name,
  leftButtonValue,
  leftButtonTitle,
  rightButtonValue,
  rightButtonTitle,
  currentValue,
  onBinaryChoiceClick,
}) => {
  return (
    <div className="grid grid-cols-3 items-center gap-4">
      <label className="text-sm font-medium text-right">{label}</label>
      <div className="flex justify-center">
        <BinaryChoiceButton
          name={name}
          value={leftButtonValue}
          currentValue={currentValue}
          title={leftButtonTitle}
          onBinaryChoiceClick={onBinaryChoiceClick}
        />
      </div>
      <div className="flex justify-center">
        <BinaryChoiceButton
          name={name}
          value={rightButtonValue}
          currentValue={currentValue}
          title={rightButtonTitle}
          onBinaryChoiceClick={onBinaryChoiceClick}
        />
      </div>
    </div>
  );
};

const BinaryChoiceButton: React.FC<BinaryChoiceButtonProps> = ({
  name,
  value,
  currentValue,
  title,
  onBinaryChoiceClick,
}) => {
  const handleClick = () => {
    onBinaryChoiceClick(name, value);
  };

  // Determine if the button should appear active
  const isActive = currentValue === value;

  return (
    <button
      type="button"
      className={`${
        isActive ? "bg-blue-500" : "bg-gray-400"
      } w-32 text-white font-semibold py-2 px-3 rounded-full mr-2`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

const VoteForm: React.FC<VoteFormProps> = ({
  handleSubmit,
  voteData,
  setVoteData,
}) => {
  const handleBinaryChoiceButtonClick = (
    name: keyof VoteData,
    value: string
  ) => {
    setVoteData((prevState) => ({
      ...prevState,
      [name]: prevState[name] === value ? "" : value, // Toggle the value
    }));
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* ObserverOrDecider */}
      <BinaryChoiceSection
        label="Observer or Decider"
        name="observerOrDecider"
        leftButtonValue="Observer"
        leftButtonTitle="O"
        rightButtonValue="Decider"
        rightButtonTitle="D"
        currentValue={voteData.observerOrDecider}
        onBinaryChoiceClick={handleBinaryChoiceButtonClick}
      />
      {/* DiOrDe */}
      <BinaryChoiceSection
        label="Di or De"
        name="diOrDe"
        leftButtonValue="Di"
        leftButtonTitle="Di"
        rightButtonValue="De"
        rightButtonTitle="De"
        currentValue={voteData.diOrDe}
        onBinaryChoiceClick={handleBinaryChoiceButtonClick}
      />
      {/* OiOrOe */}
      <BinaryChoiceSection
        label="Oi or Oe"
        name="oiOrOe"
        leftButtonValue="Oi"
        leftButtonTitle="Oi"
        rightButtonValue="Oe"
        rightButtonTitle="Oe"
        currentValue={voteData.oiOrOe}
        onBinaryChoiceClick={handleBinaryChoiceButtonClick}
      />
      {/* NOrS */}
      <BinaryChoiceSection
        label="N or S"
        name="nOrS"
        leftButtonValue="N"
        leftButtonTitle="N"
        rightButtonValue="S"
        rightButtonTitle="S"
        currentValue={voteData.nOrS}
        onBinaryChoiceClick={handleBinaryChoiceButtonClick}
      />
      {/* FOrT */}
      <BinaryChoiceSection
        label="F or T"
        name="fOrT"
        leftButtonValue="F"
        leftButtonTitle="F"
        rightButtonValue="T"
        rightButtonTitle="T"
        currentValue={voteData.fOrT}
        onBinaryChoiceClick={handleBinaryChoiceButtonClick}
      />
      {/* SleepOrPlay */}
      <BinaryChoiceSection
        label="Sleep or Play"
        name="sleepOrPlay"
        leftButtonValue="Sleep"
        leftButtonTitle="Sleep"
        rightButtonValue="Play"
        rightButtonTitle="Play"
        currentValue={voteData.sleepOrPlay}
        onBinaryChoiceClick={handleBinaryChoiceButtonClick}
      />
      {/* ConsumeOrBlast */}
      <BinaryChoiceSection
        label="Consume or Blast"
        name="consumeOrBlast"
        leftButtonValue="Consume"
        leftButtonTitle="Consume"
        rightButtonValue="Blast"
        rightButtonTitle="Blast"
        currentValue={voteData.consumeOrBlast}
        onBinaryChoiceClick={handleBinaryChoiceButtonClick}
      />
      {/* InfoOrEnergy */}
      <BinaryChoiceSection
        label="Info or Energy"
        name="infoOrEnergy"
        leftButtonValue="Info"
        leftButtonTitle="Info"
        rightButtonValue="Energy"
        rightButtonTitle="Energy"
        currentValue={voteData.infoOrEnergy}
        onBinaryChoiceClick={handleBinaryChoiceButtonClick}
      />
      {/* IOrE */}
      <BinaryChoiceSection
        label="Introvert or Extrovert"
        name="iOrE"
        leftButtonValue="I"
        leftButtonTitle="Introvert"
        rightButtonValue="E"
        rightButtonTitle="Extrovert"
        currentValue={voteData.iOrE}
        onBinaryChoiceClick={handleBinaryChoiceButtonClick}
      />
      {/* FOrMS */}
      <BinaryChoiceSection
        label="F or M Sensory"
        name="fOrMS"
        leftButtonValue="F"
        leftButtonTitle="F"
        rightButtonValue="M"
        rightButtonTitle="M"
        currentValue={voteData.fOrMS}
        onBinaryChoiceClick={handleBinaryChoiceButtonClick}
      />
      {/* FOrMDe */}
      <BinaryChoiceSection
        label="F or M De"
        name="fOrMDe"
        leftButtonValue="F"
        leftButtonTitle="F"
        rightButtonValue="M"
        rightButtonTitle="M"
        currentValue={voteData.fOrMDe}
        onBinaryChoiceClick={handleBinaryChoiceButtonClick}
      />
      <button type="submit">Submit Vote</button>
    </form>
  );
};

export default VoteForm;
