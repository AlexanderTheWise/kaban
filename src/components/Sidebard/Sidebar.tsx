import Options from "../Options/Options"
import Eye from "../icons/Eye"

interface SidebarProps {
  isHidden: boolean
  toggleHidden: () => void
}

export default function Sidebar({ isHidden, toggleHidden }: SidebarProps) {
  return (
    <div
      id="sidebar"
      className={`hidden fixed z-10 bg-bgSecond transition-transform tablet:h-[calc(100%-84.1px)] desktop:h-[calc(100%-100.1px)] duration-500 tablet:flex tablet:flex-col   
      tablet:pb-12 tablet:border-r-[2px] min-w-[261px] desktop:w-[301px] tablet:border-r-bordSecond ${
        isHidden ? "translate-x-[-100%]" : "translate-x-0"
      }
     `}
    >
      <Options />
      <div
        className={`transition-transform duration-500 ${
          isHidden ? "translate-x-full" : "translate-x-0"
        }`}
      >
        <button
          aria-expanded={!isHidden}
          aria-controls="sidebar"
          onClick={toggleHidden}
          className={`btn gap-3.5 transition-all duration-500 h-[48px] rounded-r-[100px]  ${
            isHidden
              ? "bg-bgBtnPrimary hover:bg-bgBtnPrimaryHov pl-[16px] pr-[22px]"
              : "pl-6 desktop:pl-8 justify-start text-gray hover:text-purple hover:bg-bgBtnSecondHov w-[calc(100%-1rem)] mr-4"
          }`}
        >
          <Eye fillColor={isHidden ? "#ffffff" : "#828fa3"} hidden={isHidden} />
          {isHidden ? "" : "Hide sidebar"}
        </button>
      </div>
    </div>
  )
}
