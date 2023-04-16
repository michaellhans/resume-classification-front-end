// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'classification',
    path: '/dashboard/prediction',
    icon: icon('ic_analytics'),
  },
  {
    title: 'suggestion',
    path: '/dashboard/suggestion',
    icon: icon('ic_user'),
  },
  {
    title: 'list resume',
    path: '/dashboard/list-resume',
    icon: icon('ic_blog'),
  },
];

export default navConfig;
