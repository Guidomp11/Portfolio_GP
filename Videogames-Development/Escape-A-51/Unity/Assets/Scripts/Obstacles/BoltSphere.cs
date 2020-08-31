using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEngine;

public class BoltSphere : MonoBehaviour
{
    private float moveSpeed = 15.0f;
    private float timer = 0.6f;
    
    private Vector3 pos;
    private Vector3 direction;
    private void Start()
    {
        direction = Vector3.left;
        pos = this.transform.position;
    }
    private void Update()
    {
        
        //pos += direction * Time.deltaTime * moveSpeed;
        transform.Translate(direction * Time.deltaTime * moveSpeed);
        //this.transform.position = pos;
        
        timer -= Time.deltaTime;
        if (timer <= 0)
        {
            if (direction == Vector3.left)
            {
                direction = Vector3.right;
            }
            else
            {
                direction = Vector3.left;
            }
            timer = 0.6f;
        }
        
    }
}
