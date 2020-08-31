using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class InputController : MonoBehaviour
{
    public bool GetInput()
    {
        Touch tap = Input.GetTouch(0);

        if (tap.phase == TouchPhase.Stationary)
        {
            return true;
        }

        if (tap.phase == TouchPhase.Ended)
        {
            return false;
        }
        /*
        if (Input.touchCount > 0)
        {
            Touch tap = Input.GetTouch(0);

            if (tap.phase == TouchPhase.Began)
            {
                return true;
            }

            if (tap.phase == TouchPhase.Ended)
            {
                return false;
            }
        }*/
        return false;
    }
}
