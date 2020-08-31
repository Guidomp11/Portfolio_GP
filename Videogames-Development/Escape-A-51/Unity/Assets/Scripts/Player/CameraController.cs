using System.Collections;
using System.Collections.Generic;
using UnityEngine;
//Escape from area 51
public class CameraController : MonoBehaviour
{
    public Player targetToFollow;
    private void ClampCamera()
    {
        float targetObjectX = targetToFollow.transform.position.x + 5f;
        Vector3 newCameraPosition = transform.position;
        newCameraPosition.x = targetObjectX;
        transform.position = newCameraPosition;
    }

    private void Start()
    {
        targetToFollow = FindObjectOfType<Player>();
    }

    private void Update()
    {
        ClampCamera();
    }
}
