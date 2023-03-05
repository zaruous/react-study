import StartPageContent from './StartPageContent';

const StartPage = ({prop}) => {

    return (
        <div>
            <StartPageContent prop={{...prop}}></StartPageContent>
        </div>
    );
};
  
export default StartPage;