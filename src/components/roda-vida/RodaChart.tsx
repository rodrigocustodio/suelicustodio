import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';
import { TOPICS } from './RodaSliderQuestion';

interface Props {
  scores: Record<string, number>;
  id?: string;
}

export const RodaChart = ({ scores, id }: Props) => {
  const data = TOPICS.map((topic) => ({
    subject: topic,
    value: scores[topic] ?? 0,
    fullMark: 10,
  }));

  return (
    <div id={id} className="w-full max-w-3xl mx-auto">
      <div className="w-full aspect-square max-h-[600px] min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#EAEAEA" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: '#3C3C3C', fontSize: 11, fontFamily: 'Inter' }}
              tickLine={false}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 10]}
              tick={{ fill: '#6A6A6A', fontSize: 10 }}
              tickCount={6}
            />
            <Radar
              name="Pontuação"
              dataKey="value"
              stroke="#7BAA9B"
              strokeWidth={2}
              fill="#7BAA9B"
              fillOpacity={0.25}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
