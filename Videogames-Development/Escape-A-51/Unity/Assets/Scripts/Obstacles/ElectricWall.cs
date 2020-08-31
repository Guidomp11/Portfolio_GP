using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ElectricWall : MonoBehaviour
{
    private void Start()
    {
        RandomScale();
        RotateObstacle();
    }

    private void RandomScale()
    {
        int rdm = Random.Range(0, 4);
        Vector3 obstacleScale = this.transform.localScale;
        switch (rdm)
        {
            case 0:
                obstacleScale.x = 0.9f;
                obstacleScale.y = 0.9f;
                break;
            case 1:
                obstacleScale.x = 1.3f;
                obstacleScale.y = 1.3f;
                break;
            case 2:
                obstacleScale.x = 1.5f;
                obstacleScale.y = 1.1f;
                break;
            default:
                obstacleScale.x = 1f;
                obstacleScale.y = 1f;
                break;
        }
        this.transform.localScale = obstacleScale;
    }

    private bool CanRotate()
    {
        int rdm = Random.Range(0, 11);
        if (rdm < 7)
        {
            return true;
        }
        return false;
    }

    private void RotateObstacle()
    {
        int rdm = Random.Range(0, 270);
        
        if (CanRotate())
        {
            this.transform.Rotate(0,0,rdm);
        }
    }
}
