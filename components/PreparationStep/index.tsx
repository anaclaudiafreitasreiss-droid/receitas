interface PreparationStepProps {
  index: number;
  description: string;
}

export default function PreparationStep({ index, description }: PreparationStepProps) {
  return (
    <li className="flex gap-2">
      <span className="flex justify-center items-center bg-orange-100 w-6 h-6 rounded-full text-orange-500 flex-shrink-0">{index}</span>
      <p>{description}</p>
    </li>
  )
};