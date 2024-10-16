export interface TextProps {
  text: string;
  type: 'title' | 'paragraph' | 'text';
  size?: 'xs' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}