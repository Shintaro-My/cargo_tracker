import { GetServerSideProps } from "next";
import { Kuroneko, Sagawa } from '@/myutil';
import Index from './index';
import './tracking.scss';

type Props = {
    kuro: string;
    saga: string;
};

const Test = (props: Props) => {
    return (
        <>
            <Index />

            <div className="tracking-wrap grid grid-cols-1 sm:grid-cols-2 p-2">

                <div className="tracking kuroneko mx-3">
                    <div className="kuroneko-header">
                        <div className="title">
                            ヤマト運輸
                        </div>
                    </div>
                    <div dangerouslySetInnerHTML={{__html: props.kuro}} className="tracking-invoice-block"></div>
                </div>

                <div className="tracking sagawa mx-3">
                    <div className="sagawa-header">
                        <div className="title">
                            佐川急便
                        </div>
                    </div>
                    <div dangerouslySetInnerHTML={{__html: props.saga}} className="tracking-invoice-block"></div>
                </div>

            </div>
        </>
    )
    // <div dangerouslySetInnerHTML={{__html: props.saga}} className="tracking-invoice-block"></div>
};

export default Test;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { pid } = context.query;
    const [kuro, saga] = await Promise.all([Kuroneko(pid as string), Sagawa(pid as string)]);
    //console.log(src);
    const props: Props = { kuro, saga };
    return { props };
};