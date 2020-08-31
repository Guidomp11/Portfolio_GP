using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public enum ObstacleTypes
{
    ElectricWall,
    Projectile,
    HorizontalLaser,
    BoltSphere
}

public enum PlatformsType
{
    PlatformA,
    PlatformB,
    PlatformC,
    PlatformD
}

public enum GestureType
{
    none,
    toRight,
    toLeft,
    swipeUp,
    swipeDown,
    toLeftDiagonalDown,
    toRightDiagonalDown,
    toLeftDiagonalUp,
    toRightDiagonalUp
}

public enum MoneyGroup
{
    MCoin,
    OCoin,
    Rectangle,
    Square
}