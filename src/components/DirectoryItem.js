import { useNavigate } from 'react-router-dom';
import { BackgroundImage, Body, DirectoryItemContainer } from '../Styles/DirectoryItem.styles.js';

const DirectoryItem = (props) => {
    const {title, imageUrl, route} = props.category;
    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(route);

  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageUrl={imageUrl} /> 
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
}

export default DirectoryItem;