import React, { useState } from 'react';
import { treeData } from './TreeViewItems';

export interface TreeItem {
    label: string;
    children?: TreeItem[];
    id?: string;
}

interface TreeViewProps {
    onSelect?: (id: string) => void;
    items?: TreeItem[];
}

const TreeView: React.FC<TreeViewProps> = ({ onSelect, items = treeData }) => {
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const toggleItem = (label: string) => {
        const newExpanded = new Set(expandedItems);
        if (expandedItems.has(label)) {
            newExpanded.delete(label);
        } else {
            newExpanded.add(label);
        }
        setExpandedItems(newExpanded);
    };

    const getMasterIcon = (id: string) => {
        switch (id.toLowerCase()) {
            case 'meyer':
                return '/assets/icons/meyer.png';
             case 'fiore':
                return '/assets/icons/fiore.png';
             case 'basics':
                 return '/assets/icons/basics.png';
            default:
                return null;
        }
    };

    const MasterIcon = ({ id, mirror = false }: { id: string; mirror?: boolean }) => {
        const iconPath = getMasterIcon(id);
        if (!iconPath) return null;
        
        return (
            <img 
                src={iconPath}
                className={`w-10 h-10 object-contain ${mirror ? 'scale-x-[-1]' : ''}`} // for mirroring the icon on the other side
            />
        );
    };

    const TreeItem: React.FC<{ item: TreeItem; level: number }> = ({ item, level }) => {
        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = expandedItems.has(item.label);
        const isSelected = item.id && selectedItem === item.id;

        const handleClick = () => {
            if (hasChildren) {
                toggleItem(item.label);
            } else if (item.id && onSelect) {
                setSelectedItem(item.id);
                onSelect(item.id);
            }
        };

        return (
            <div className={`ml-${level * 4}`}>
                <div 
                    onClick={handleClick}
                    className={`p-2 rounded-md cursor-pointer flex items-center justify-between
                        ${hasChildren ? 'hover:bg-gray-700/50' : 'hover:bg-gray-700/50'}
                        ${item.id ? 'ml-6' : ''}
                        ${isSelected ? 'bg-gray-700/30' : ''}
                        group
                    `}
                >
                    <div className="flex items-center gap-2">
                        {isSelected && item.id && <MasterIcon id={item.id} mirror={true} />}
                        {hasChildren && (
                            <span
                                className={`
                                    transform transition-transform duration-200 inline-block mr-2
                                    ${isExpanded ? 'rotate-90' : ''}
                                `}
                            >
                                ▶
                            </span>
                        )}
                        <span>{item.label}</span>
                    </div>
                    {isSelected && item.id && <MasterIcon id={item.id} />}
                </div>

                {hasChildren && isExpanded && (
                    <div className="ml-2">
                        {item.children?.map((child, index) => (
                            <TreeItem
                                key={`${child.label}-${index}`}
                                item={child}
                                level={level + 1}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="mt-4">
            {items.map((item, index) => (
                <TreeItem
                    key={`${item.label}-${index}`}
                    item={item}
                    level={0}
                />
            ))}
        </div>
    );
};

export default TreeView;