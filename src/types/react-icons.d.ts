declare module 'react-icons/fi' {
  import { ComponentType, SVGAttributes } from 'react';
  
  export interface IconBaseProps extends SVGAttributes<SVGElement> {
    size?: string | number;
    color?: string;
    className?: string;
  }
  
  export const FiSearch: ComponentType<IconBaseProps>;
  export const FiBell: ComponentType<IconBaseProps>;
  export const FiShoppingCart: ComponentType<IconBaseProps>;
  export const FiX: ComponentType<IconBaseProps>;
  export const FiTrash2: ComponentType<IconBaseProps>;
  export const FiPlus: ComponentType<IconBaseProps>;
  export const FiMinus: ComponentType<IconBaseProps>;
  export const FiEdit2: ComponentType<IconBaseProps>;
  export const FiChevronLeft: ComponentType<IconBaseProps>;
  export const FiAlertCircle: ComponentType<IconBaseProps>;
}

declare module 'react-icons/ai' {
  import { ComponentType, SVGAttributes } from 'react';
  
  export interface IconBaseProps extends SVGAttributes<SVGElement> {
    size?: string | number;
    color?: string;
    className?: string;
  }
  
  export const AiOutlineMenu: ComponentType<IconBaseProps>;
}