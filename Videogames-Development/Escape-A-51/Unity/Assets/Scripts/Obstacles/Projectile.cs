using System.Collections;
using System.Collections.Generic;
using System.Diagnostics.Tracing;
using System.IO;
using UnityEngine;
using UnityEngine.UIElements;

public class Projectile : MonoBehaviour
{
    private float moveSpeed = 5.0f;
    
    private float frequency = 20f;
    private float magnitude = 0.1f;
    private Vector3 axis;

    private Vector3 pos;


    
    void Start()
    {
        pos = transform.position;
        axis = transform.up;
    }

    void Update()
    {
        transform.Translate((Vector3.right * Time.deltaTime * moveSpeed) + axis * Mathf.Sin(Time.time * frequency) * magnitude);

    }
    
}
