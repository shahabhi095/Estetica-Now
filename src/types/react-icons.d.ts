declare module 'react-icons/fi' {
  import { ComponentType, SVGAttributes } from 'react';
  
  export interface IconBaseProps extends SVGAttributes<SVGElement> {
    size?: string | number;
    color?: string;
  }
  
  export const FiSearch: ComponentType<IconBaseProps>;
  export const FiBell: ComponentType<IconBaseProps>;
  export const FiShoppingCart: ComponentType<IconBaseProps>;
  export const FiX: ComponentType<IconBaseProps>;
  export const FiTrash2: ComponentType<IconBaseProps>;
  export const FiPlus: ComponentType<IconBaseProps>;
  export const FiMinus: ComponentType<IconBaseProps>;
  export const FiEdit2: ComponentType<IconBaseProps>;
}