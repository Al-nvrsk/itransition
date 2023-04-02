import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { routePath } from '../utils/routePath';
import './MenuPage.css'

export const MenuPage = () => {
    const navigate = useNavigate()

    return (
        <div className='menu-page'>
            <Button 
                htmlType='button'
                className="menu-page__button"
                onClick={() => navigate(routePath.task4)}
            >
                Task 4
            </Button>
            <Button 
                htmlType='button'
                className="menu-page__button"
                onClick={() => navigate(routePath.task5)}
            >
                Task5
            </Button>
            <Button 
                htmlType='button'
                className="menu-page__button"
                onClick={() => navigate(routePath.task6)}
                disabled={true}
            >
                Task6
            </Button>
            <Button 
                htmlType='button'
                className="menu-page__button"
                onClick={() => navigate(routePath.task7)}
            >
                Task7
            </Button>
        </div>
    )
}
