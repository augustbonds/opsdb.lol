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
      } text-white font-semibold py-2 px-4 rounded-full mr-2`}
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
    <form onSubmit={handleSubmit}>
      {/* ObserverOrDecider */}
      <div>
        <label>Observer or Decider:</label>
        <div>
          <BinaryChoiceButton
            name="observerOrDecider"
            value="Observer"
            currentValue={voteData.observerOrDecider}
            title="O"
            onBinaryChoiceClick={handleBinaryChoiceButtonClick}
          />
          <BinaryChoiceButton
            name="observerOrDecider"
            value="Decider"
            currentValue={voteData.observerOrDecider}
            title="D"
            onBinaryChoiceClick={handleBinaryChoiceButtonClick}
          />
        </div>
      </div>

      {/* DiOrDe */}
      <div>
        <label>Di or De:</label>
        <div>
          <BinaryChoiceButton
            name="diOrDe"
            value="Di"
            currentValue={voteData.diOrDe}
            title="Di"
            onBinaryChoiceClick={handleBinaryChoiceButtonClick}
          />
          <BinaryChoiceButton
            name="diOrDe"
            value="De"
            currentValue={voteData.diOrDe}
            title="De"
            onBinaryChoiceClick={handleBinaryChoiceButtonClick}
          />
        </div>
      </div>

      {/* OiOrOe */}
      <div>
        <label>Oi or Oe:</label>
        <div>
          <BinaryChoiceButton
            name="oiOrOe"
            value="Oi"
            currentValue={voteData.oiOrOe}
            title="Oi"
            onBinaryChoiceClick={handleBinaryChoiceButtonClick}
          />
          <BinaryChoiceButton
            name="oiOrOe"
            value="Oe"
            currentValue={voteData.oiOrOe}
            title="Oe"
            onBinaryChoiceClick={handleBinaryChoiceButtonClick}
          />
        </div>
      </div>

      {/* NOrS */}
      <div>
        <label>N or S:</label>
        <div>
          <BinaryChoiceButton
            name="nOrS"
            value="N"
            currentValue={voteData.nOrS}
            title="N"
            onBinaryChoiceClick={handleBinaryChoiceButtonClick}
          />
          <BinaryChoiceButton
            name="nOrS"
            value="S"
            currentValue={voteData.nOrS}
            title="S"
            onBinaryChoiceClick={handleBinaryChoiceButtonClick}
          />
        </div>
      </div>

      {/* FOrT */}
      <div>
        <label>F or T:</label>
        <div>
          <BinaryChoiceButton
            name="fOrT"
            value="F"
            currentValue={voteData.fOrT}
            title="F"
            onBinaryChoiceClick={handleBinaryChoiceButtonClick}
          />
          <BinaryChoiceButton
            name="fOrT"
            value="T"
            currentValue={voteData.fOrT}
            title="T"
            onBinaryChoiceClick={handleBinaryChoiceButtonClick}
          />
        </div>
      </div>

      {/* SleepOrPlay */}
      <div>
        <label>Sleep or Play:</label>
        <div>
          <BinaryChoiceButton
            name="sleepOrPlay"
            value="Sleep"
            currentValue={voteData.sleepOrPlay}
            title="Sleep"
            onBinaryChoiceClick={handleBinaryChoiceButtonClick}
          />
          <BinaryChoiceButton
            name="sleepOrPlay"
            value="Play"
            currentValue={voteData.sleepOrPlay}
            title="Play"
            onBinaryChoiceClick={handleBinaryChoiceButtonClick}
          />
        </div>
      </div>

      {/* ConsumeOrBlast */}
      <div>
        <label>Consume or Blast:</label>
        <div>
          <BinaryChoiceButton
            name="consumeOrBlast"
            value="Consume"
            currentValue={voteData.consumeOrBlast}
            title="Consume"
            onBinaryChoiceClick={handleBinaryChoiceButtonClick}
          />
          <BinaryChoiceButton
            name="consumeOrBlast"
            value="Blast"
            currentValue={voteData.consumeOrBlast}
            title="Blast"
            onBinaryChoiceClick={handleBinaryChoiceButtonClick}
          />
        </div>
      </div>

      {/* InfoOrEnergy */}
      <div>
        <label>Info or Energy:</label>
        <div>
          <BinaryChoiceButton
            name="infoOrEnergy"
            value="Info"
            currentValue={voteData.infoOrEnergy}
            title="Info"
            onBinaryChoiceClick={handleBinaryChoiceButtonClick}
          />
          <BinaryChoiceButton
            name="infoOrEnergy"
            value="Energy"
            currentValue={voteData.infoOrEnergy}
            title="Energy"
            onBinaryChoiceClick={handleBinaryChoiceButtonClick}
          />
        </div>
      </div>

      {/* IOrE */}
      <div>
        <label>Introvert or Extrovert:</label>
        <div>
          <BinaryChoiceButton
            name="iOrE"
            value="I"
            currentValue={voteData.iOrE}
            title="Introvert"
            onBinaryChoiceClick={handleBinaryChoiceButtonClick}
          />
          <BinaryChoiceButton
            name="iOrE"
            value="E"
            currentValue={voteData.iOrE}
            title="Extrovert"
            onBinaryChoiceClick={handleBinaryChoiceButtonClick}
          />
        </div>
      </div>

      {/* FOrMS */}
      <div>
        <label>F or M Sensory</label>
        <div>
          <BinaryChoiceButton
            name="fOrMS"
            value="F"
            currentValue={voteData.fOrMS}
            title="F"
            onBinaryChoiceClick={handleBinaryChoiceButtonClick}
          />
          <BinaryChoiceButton
            name="fOrMS"
            value="M"
            currentValue={voteData.fOrMS}
            title="M"
            onBinaryChoiceClick={handleBinaryChoiceButtonClick}
          />
        </div>
      </div>

      {/* FOrMDe */}
      <div>
        <label>F or M Extroverted Decier</label>
        <div>
          <BinaryChoiceButton
            name="fOrMDe"
            value="F"
            currentValue={voteData.fOrMDe}
            title="F"
            onBinaryChoiceClick={handleBinaryChoiceButtonClick}
          />
          <BinaryChoiceButton
            name="fOrMDe"
            value="M"
            currentValue={voteData.fOrMDe}
            title="M"
            onBinaryChoiceClick={handleBinaryChoiceButtonClick}
          />
        </div>
      </div>
      <button type="submit">Submit Vote</button>
    </form>
  );
};

export default VoteForm;
