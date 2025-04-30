import { Redirect } from "expo-router";
import MatterhornCard from "~/components/LinearCard";

const Index = () => {
    return <Redirect href="/welcome" />;
    // return <MatterhornCard/>
};

export default Index;