'use client'
import Image from 'next/image';
import IDOS from '../../../../public/assets/category/IDOS.png';
import { Jost } from 'next/font/google';
import ConnectWallet from '../../../../public/assets/icon/Howtowork/connectwallet.png';
import CheckBalance from '../../../../public/assets/icon/Howtowork/checkbalance.png';
import SelectSale from '../../../../public/assets/icon/Howtowork/selectsale.png';
import Participate from '../../../../public/assets/icon/Howtowork/participate.png';

const jost = Jost({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-jost',

})

export default function Howitworks() {
    return (
        <section className={`w-full pt-[120px] ${jost.className}`} id='howitworks'>
            <h1 className='2xl:text-[40px] text-maintitle text-center lg2:text-left font-bold text-white'>HOW TO PARTICIPATE IN IDOS?</h1>
            <div className='hidden lg:block  mt-[-50px]'>
                <Image
                    alt='howitworks'
                    src={IDOS}
                    className='w-[100%] ml-[-25px]'
                />
                <div className='w-full grid-cols-4 gap-5 grid'>
                    <div>
                        <h1 className='text-[24px] font-medium'>CONNECT YOUR WALLET</h1>
                        <p className='text-[16px] font-light mt-[15px]'>Connect the wallet you use on the Sui or Aptos network to the website.</p>
                    </div>
                    <div>
                        <h1 className='text-[24px] font-medium'>CHECK YOUR BALANCE</h1>
                        <p className='text-[16px] font-light mt-[15px]'>Ensure that the amount you want to purchase is available in your wallet.</p>
                    </div>
                    <div>
                        <h1 className='text-[24px] font-medium'>SELECT THE SALE</h1>
                        <p className='text-[16px] font-light mt-[15px]'>Select the sale you wish to join and enter your purchase amount.</p>
                    </div>
                    <div>
                        <h1 className='text-[24px] font-medium'>APPROVE AND PARTICIPATE</h1>
                        <p className='text-[16px] font-light mt-[15px]'>Approve the wallet transactions to participate in the IDO.</p>
                    </div>
                </div>
            </div>

            {/* hidden responsive section */}
            <div className='py-3 w-full lg:hidden mt-[50px] flex flex-col gap-[30px]'>
                <div className='w-full flex justify-between'>

                    <Image
                        alt='connect wallet'
                        src={ConnectWallet}
                        className=' lg:w-[200px] w-howworkwidth ml-[10px]'
                    />

                    <div className='w-[50vw]'>
                        <h1 className='sm:text-[24px] mt-[10px] text-howwork font-medium'>CONNECT YOUR WALLET</h1>
                        <p className='sm:text-[16px] text-howworkdescription font-light mt-[10px]'>Connect the wallet you use on the Sui or Aptos network to the website.</p>
                    </div>
                </div>
                <div className='w-full flex justify-between'>
                    <Image
                        alt='check balance'
                        src={CheckBalance}
                        className=' lg:w-[200px] min-w-[80px] w-howworkwidth ml-[10px]'
                    />

                    <div className='w-[50vw]'>
                        <h1 className='sm:text-[24px] mt-[10px] text-howwork font-medium'>CHECK YOUR BALANCE</h1>
                        <p className='sm:text-[16px] text-howworkdescription font-light mt-[10px]'>Ensure that the amount you want to purchase is available in your wallet.</p>
                    </div>
                </div>
                <div className='w-full flex justify-between'>

                    <Image
                        alt='select the sale'
                        src={SelectSale}
                        className=' lg:w-[200px] min-w-[80px] w-howworkwidth ml-[10px]'
                    />
                    <div className='w-[50vw]'>
                        <h1 className='sm:text-[24px] mt-[10px] text-howwork font-medium'>SELECT THE SALE</h1>
                        <p className='sm:text-[16px] text-howworkdescription font-light mt-[10px]'>Select the sale you wish to join and enter your purchase amount.</p>
                    </div>
                </div>

                <div className='w-full flex justify-between'>
                    <Image
                        alt='approve and participate'
                        src={Participate}
                        className=' lg:w-[200px] min-w-[80px] w-howworkwidth ml-[10px]'
                    />
                    <div className='w-[50vw]'>
                        <h1 className='sm:text-[24px] mt-[10px] text-howwork font-medium'>APPROVE AND PARTICIPATE</h1>
                        <p className='sm:text-[16px] text-howworkdescription font-light mt-[10px]'>Approve the wallet transactions to participate in the IDO.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};