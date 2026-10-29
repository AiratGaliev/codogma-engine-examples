# Каталог примеров

## Основная подборка

| Пример | Что изучать в редакторе | Что работает в игре | Сцены |
|---|---|---|---|
| [01 — Scene Composition](examples/01-scene-composition/) | Композиция фигур, текст, позиционирование, размеры, слои и Inspector | Переключение визуальной темы по клику, интерактивность объектов | `CompositionScene.scene` |
| [02 — Reusable Prefabs](examples/02-reusable-prefabs/) | Prefab и его экземпляры, собственное свойство Prefab, Hierarchy | Повторно используемые порталы меняют состояние при нажатии | `RoomScene.scene`, `PortalPrefab.scene` |
| [03 — Platformer Physics](examples/03-platformer-physics/) | Состав уровня и объекты, коллизии которых настраиваются в пользовательском коде | Движение, прыжок, Arcade Physics, сбор объектов и камера | `PlatformerLevel.scene` |
| [04 — Animation & Tweens](examples/04-animation-tweens/) | Редактируемая сцена-стенд и именованные объекты | Повторяющиеся Tween, easing, синхронизированная анимация и camera shake по клику | `AnimationTweenLab.scene` |
| [05 — Input Interaction Lab](examples/05-input-interaction-lab/) | Карточки и целевые слоты, которые можно переставлять в Scene Editor | Drag-and-drop, snap-to-slot и возврат карточки при неудачном drop | `InteractionLab.scene` |
| [06 — Multi-Scene Game](examples/06-multi-scene-game/) | Независимые сцены меню, уровня и результатов | Scene Manager, передача итоговых данных и перезапуск цикла | `MenuScene.scene`, `LevelScene.scene`, `ResultsScene.scene` |

## Принцип покрытия

Каждый проект закрывает самостоятельный editor/runtime сценарий. Не добавляйте второй пример только ради демонстрации другого имени метода. Предпочтительнее дополнять каталог тогда, когда новый проект раскрывает отдельный workflow, комбинацию подсистем или подтверждённый пробел редактора.

## Следующие кандидаты — ещё не реализованы в этой подборке

1. **Настоящий Tilemap workflow:** редактируемые тайлы/слои, collision tiles и проверенный импорт карты.
2. **Animation Editor:** spritesheet/atlas, именованные анимации, события и переключение состояний персонажа.
3. **Asset Pack & audio:** несколько поддерживаемых типов ресурсов, preload, музыка/эффекты и обработка ошибок.
4. **Advanced FX / rendering:** FX preview против runtime, маски, shader и очистка ресурсов — после подтверждения API Phaser 4.2.1.
5. **Box2D и Spine:** только после самостоятельной runtime-приёмки поддерживаемого workflow.
6. **Platform services:** отдельные проекты для адаптеров платформ после того, как появится соответствующий контракт Codogma.

Наличие кандидата в этом списке — направление покрытия, а не заявление о готовности соответствующей функции в движке.
